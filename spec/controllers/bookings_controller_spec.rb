require "rails_helper"

RSpec.describe BookingsController, type: :controller do
  render_views

  let(:user) { User.create!(first_name: "Test", email: "test@example.com", password: "password") }
  let(:day_slot) { DaySlot.create!(day: "Monday") }
  let(:slot) { Slot.create!(start_time: 8, end_time: 10, day_slot: day_slot) }

  before do
    allow(controller).to receive(:set_current_user).and_return(user)
    controller.instance_variable_set(:@current_user, user)
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new booking" do
        expect {
          post :create, params: { booking: { slot_id: slot.id, user_id: user.id } }
        }.to change(Booking, :count).by(1)

        expect(response).to have_http_status(201)
        expect(JSON.parse(response.body)["message"]).to eq("Booking Successfully Created")
      end
    end

    context "with invalid attributes" do
      it "does not create a new booking" do
        expect {
          post :create, params: { booking: { slot_id: nil, user_id: user.id } }
        }.to_not change(Booking, :count)

        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)["error"]).to eq("Booking Unsuccessful")
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:booking) { Booking.create!(slot: slot, user: user) }

    it "deletes the booking" do
      expect {
        delete :destroy, params: { id: booking.id }
      }.to change(Booking, :count).by(-1)

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["booking_deleted"]).to be true
    end

    it "returns error when booking not found" do
      expect {
        delete :destroy, params: { id: "invalid_id" }
      }.to_not change(Booking, :count)

      expect(response).to have_http_status(404)
      expect(JSON.parse(response.body)["booking_deleted"]).to be false
    end
  end

  describe 'GET #get_bookings_from_user' do
    context 'when user is logged in' do
      let!(:booking) { Booking.create!(slot: slot, user: user) }

      it 'returns user bookings' do
        get :get_bookings_from_user

        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['logged_in']).to be true
        expect(JSON.parse(response.body)['bookings'].length).to eq(1)
      end
    end

    context 'when user is not logged in' do
      before do
        allow(controller).to receive(:set_current_user).and_return(nil)
        controller.instance_variable_set(:@current_user, nil)
      end

      it 'returns an error' do
        get :get_bookings_from_user

        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)['logged_in']).to be false
        expect(JSON.parse(response.body)['errors']).to include('Not Logged In')
      end
    end
  end
end