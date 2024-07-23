require "rails_helper"

RSpec.describe FeedbacksController, type: :controller do
  render_views

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new feedback and returns a successful response" do
        post :create, params: { feedback: { feedback: "This is a test feedback" } }
        expect(response).to have_http_status(201)
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq("Success")
        expect(json_response['message']['feedback']).to eq("This is a test feedback")
      end
    end

    context "with invalid attributes" do
      it "does not create feedback and returns an error" do
        post :create, params: { feedback: { feedback: "" } }
        expect(response).to have_http_status(422)
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq("error")
        expect(json_response['message']['feedback']).to be_nil
      end
    end
  end

  describe "GET #index" do
    it "returns all feedbacks" do
      feedback1 = Feedback.create!(feedback: "First feedback")
      feedback2 = Feedback.create!(feedback: "Second feedback")
      get :index
      expect(response).to have_http_status(200)
      json_response = JSON.parse(response.body)
      expect(json_response.length).to eq(2)
      expect(json_response[0]['feedback']).to eq(feedback1.feedback)
      expect(json_response[1]['feedback']).to eq(feedback2.feedback)
    end
  end
end