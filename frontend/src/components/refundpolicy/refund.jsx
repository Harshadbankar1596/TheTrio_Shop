import {useEffect} from "react";

const RefundPolicy = () => {
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

  return (
    <div className="flex w-full items-center justify-center">
        <div className="text-white w-8/12">
      <h2>Refund & Exchange Policy</h2>

      <h3>EXCHANGE POLICY (NO RETURN, NO REFUND)</h3>

      <p>
        If you receive any kind of damaged order, you must submit the unboxing
        video of the order to entertain any kind of query. If you do not have a
        full unboxing or opening video of the received product, then we will not
        entertain any kind of query.
      </p>

      <p>
        If we accept your exchange request, then only one-time exchange is
        possible. More than one exchange is not allowed, and refund is not
        possible under any circumstances.
      </p>

      <p>
        ₹200/- will be charged for the exchange process per order (includes both
        side courier charges).
      </p>

      <h3>Role of Customer for Exchange Process</h3>

      <p>
        1. The customer is solely responsible for sending the exchange product
        back to us along with the packing video. When the shipment arrives at
        our warehouse, if any tampering is found, or if the product is empty,
        wrong, or not as stated by you, the exchange will be declined immediately
        and the same will be sent back to you. Refund will not be applicable.
      </p>

      <p>
        If we do not have the same product available for exchange, then you must
        select another product. Personalized or customized items cannot be
        exchanged unless they are defective or damaged on arrival.
      </p>

      <h3>2. Exchange Process:</h3>
      <p>Provide your order number, item details, and reason for exchange.</p>
      <p>
        Once your exchange request is approved, we will provide you with the
        return shipping address.
      </p>
      <p>
        After receiving the exchange product, we will dispatch the new item
        selected by you. The exchange processing time is 10–15 working days after
        receiving the request.
      </p>

      <h3>3. Return Shipping:</h3>
      <p>
        Customers are responsible for the cost of return shipping. We recommend
        using a trackable and insured shipping method to ensure the safe return
        of the item(s). TheTrio.in is not responsible for items lost or damaged
        during return shipping.
      </p>

      <h3>4. Inspection and Approval:</h3>
      <p>
        Once we receive the returned item(s), our team will inspect them to
        ensure they meet exchange eligibility criteria.
      </p>
      <p>
        If the items pass inspection, we will process the exchange and ship the
        replacement item(s) to the address provided in the original order.
      </p>

      <h3>5. Exchange Restrictions:</h3>
      <p>
        Exchanges are subject to product availability. If the requested item is
        out of stock, we will offer store credit or an alternative item of equal
        value.
      </p>
      <p>
        Exchange requests not meeting our policy guidelines will not be
        processed and will be returned to the customer at their own expense.
      </p>

      <h3>6. Contact Us:</h3>
      <p>
        If you have any questions about our exchange policy, please contact our
        customer service team:
      </p>
      <p>
        <strong>Email:</strong> costumersservice888@gmail.com
      </p>

      <p>
        By making a purchase from TheTrio.in, you acknowledge and agree to abide
        by our “No Refund, Only Exchange” policy.
      </p>

      <p>Thank you for choosing TheTrio.in. We appreciate your support.</p>

      <p>Sincerely,</p>
      <p><strong>TheTrio.in</strong></p>
    </div>
    </div>
  );
};

export default RefundPolicy;
