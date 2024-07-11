class StaticController < ApplicationController
    def home
        render json: {
            status: "Backend online..."
        }
    end
end