// router.js
const { API_KEY, API_SECRET } = require('./config');
const Amadeus = require('amadeus');
const express = require('express');
// Create router
const router = express.Router();
// Create Amadeus API client
const amadeus = new Amadeus({
  clientId: API_KEY,
  clientSecret: API_SECRET,
}); 

router.get(`/home`, async (req, res) => {
  try {
    res.json({ message: 'welcome to dalvi faraz server' });
  } catch (err) {
    res.json(err);
  }
});

router.get(`/search-location`, async (req, res) => {
  try {
    const { keyword, pageLimit, pageOffset } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword,
      'page[limit]': pageLimit,
      'page[offset]': pageOffset,
      subType: Amadeus.location.city,
    });
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});

router.get(`/city-hotels`, async (req, res) => {
  try {
    const { cityCode} = req.query;
    const response = await amadeus.shopping.hotelOffers.get({
      cityCode,
    });
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});

router.get(`/hotel-offers`, async (req, res) => {
  try {
    const { hotelId } = req.query;
    const response = await amadeus.shopping.hotelOffersByHotel.get({
      hotelId,
    });
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});

router.get(`/hotel-offer`, async (req, res) => {
  try {
    const { offerId } = req.query;
    const response = await amadeus.shopping.hotelOffer(offerId).get();
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});

router.post(`/book-hotel`, async (req, res) => {
  try {
    const { guests, payments, offerId } = req.body;
    const response = await amadeus.booking.hotelBookings.post(
      JSON.stringify({
        data: {
          offerId,
          guests,
          payments,
        },
      })
    );
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
