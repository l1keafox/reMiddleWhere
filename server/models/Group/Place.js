// This is an Model so it can be send via gql.
// Below is the data structure that Google Places API gives
/*
{
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8675219,
               "lng" : 151.2016502
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.86614532010728,
                  "lng" : 151.2031259298927
               },
               "southwest" : {
                  "lat" : -33.86884497989272,
                  "lng" : 151.2004262701072
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
         "icon_background_color" : "#7B9EB0",
         "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
         "name" : "Sydney Harbour Dinner Cruises",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 835,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/109764923610545394994\"\u003eA Google User\u003c/a\u003e"
               ],
               "photo_reference" : "AW30NDwnuWHbkZezADQaZiBuvP3QL9KmyqIQH6TncI9DlrgBQ-fkBw-635W_ilyxPXaq_bZ0fue1hitMDTYTkq6H6-M6K6quYuJpcQ7o913pFtNvEct6fNQaYfi0SHKEoEJMU6z3-AWe_vweNgxTipwFQXtNz_lASg4V5IatofFdGhCb2QaX",
               "width" : 1200
            }
         ],
         "place_id" : "ChIJM1mOVTS6EmsRKaDzrTsgids",
         "plus_code" : {
            "compound_code" : "46J2+XM Sydney, New South Wales",
            "global_code" : "4RRH46J2+XM"
         },
         "rating" : 4.8,
         "reference" : "ChIJM1mOVTS6EmsRKaDzrTsgids",
         "scope" : "GOOGLE",
         "types" : [
            "tourist_attraction",
            "travel_agency",
            "restaurant",
            "point_of_interest",
            "food",
            "establishment"
         ],
         "user_ratings_total" : 16,
         "vicinity" : "32 The Promenade, Sydney"
      }
*/
const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  locationName: {
    type: String,
    trim: true,
  },
});

const Place = model("Place", placeSchema);

module.exports = Place;
