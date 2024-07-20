require "test_helper"

class GymSessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get gym_sessions_index_url
    assert_response :success
  end
end
