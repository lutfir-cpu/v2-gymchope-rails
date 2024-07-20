require 'rails_helper'

RSpec.describe Feedback, type: :model do
  it "is valid with proper and valid attributes" do
    feedback = Feedback.new(feedback: "This is a test feedback")
  end

  it "is invalid without feedback" do
    feedback = Feedback.new(feedback: "nil")
    expect(feedback).to_not be_valid
  end
end