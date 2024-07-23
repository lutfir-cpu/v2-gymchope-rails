require "test_helper"

class GymCardsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get gym_cards_index_url
    assert_response :success
  end
end
