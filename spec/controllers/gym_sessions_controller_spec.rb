require "rails_helper"

RSpec.describe GymSessionsController, type: :controller do
  render_views

  let(:user) { User.create!(email: "test@email.com", password: "password", first_name: "Test") }
  let(:slot) { Slot.create!(start_time: 8, end_time: 10, day_slot: DaySlot.create!(day: "Monday")) }
  let(:gym_card) { GymCard.create!(name: "Gym Card 1") }
  let(:booking) { Booking.create!(user: user, slot: slot) }
  let(:gym_session) {GymSession.create!(user: user, slot: slot, gym_card: gym_card, collect_time: Time.now) }

  before do
    allow(controller).to receive(:set_current_user).and_return(user)
    controller.instance_variable_set(:@current_user, user)
  end

  describe "GET #index" do
    it "returns a successful response" do
      get :index
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).size).to eq(GymSession.count)

    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new gym session and deletes the booking" do
        expect {
          post :create, params: { booking: { id: booking.id, user_id: user.id, slot_id: slot.id },
                                  gym_card: { id: gym_card.id } }
        }.to change(GymSession, :count).by(1)

        expect(response).to have_http_status(201)
        expect(JSON.parse(response.body)['gym_session_created']).to be_truthy
      end
    end

    context "with invalid attributes" do
      it "does not create a new gym session" do
        expect {
          post :create, params: { booking: { id: booking.id, user_id: nil, slot_id: slot.id },
                                  gym_card: { id: gym_card.id } }
        }.not_to change(GymSession, :count)

        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)['gym_session_created']).to be_falsey
      end
    end
  end

  describe "PUT #update" do
    context "with valid attributes" do
      it "updates the gym session" do
        put :update, params: { id: gym_session.id, status: 'completed' }
        gym_session.reload
        expect(response).to have_http_status(200)
        expect(gym_session.status).to eq('completed')
      end
    end

    context "with invalid attributes" do
      it "does not update the gym session" do
        put :update, params: { id: gym_session.id, status: nil }
        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)['updated']).to be_falsey
      end
    end
  end

  describe "GET #get_ongoing_gym_session" do
    context "when there is an ongoing gym session" do
      before do
        gym_session.update(status: 'ongoing')
      end

      it "returns the ongoing gym session" do
        get :get_ongoing_gym_session
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['id']).to eq(gym_session.id)
      end
    end

    context "when there is no ongoing gym session" do
      it "returns nil" do
        get :get_ongoing_gym_session
        expect(response).to have_http_status(204)
        expect(response.body).to eq("null")
      end
    end
  end
end