const express = require("express");
const router = express.Router();

const {
  requestService,
  myRequests,
  acceptRequest,
  rejectRequest,
  acceptedRequests,
  rejectedRequests,
  khaltipayment,
} = require("../controllers/serviceRequests");
router.route("/khaltiapi").post(khaltipayment);
router.route("/:id").post(requestService);
router.route("/").get(myRequests);
router.route("/:id/accept").patch(acceptRequest);
router.route("/:id/reject").patch(rejectRequest);
router.route("/acceptedrequests").get(acceptedRequests);
router.route("/rejectedrequests").get(rejectedRequests);
router.post("/khaltiapi",khaltipayment);
module.exports = router;
