# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_21_075009) do
  create_table "bookings", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "slot_id", null: false
    t.index ["slot_id"], name: "index_bookings_on_slot_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "day_slots", force: :cascade do |t|
    t.string "day"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.text "feedback"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "slots", force: :cascade do |t|
    t.integer "start_time"
    t.integer "end_time"
    t.integer "day_slot_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "number_of_users"
    t.index ["day_slot_id"], name: "index_slots_on_day_slot_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bookings", "slots"
  add_foreign_key "bookings", "users"
  add_foreign_key "slots", "day_slots"
end
