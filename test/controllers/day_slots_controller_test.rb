require "test_helper"

class DaySlotsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get day_slots_index_url
    assert_response :success
  end
end
