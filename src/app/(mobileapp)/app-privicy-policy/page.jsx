export default function Page() {
  return (
    <div className="px-6 md:px-16 lg:px-40 py-10 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Last updated:</strong> {new Date().toLocaleDateString()}
      </p>

      <p className="mb-4">
        This Privacy Policy describes how <strong>Spice Direct Wholesale LTD</strong>
        (“we”, “our”, “us”) collects, uses, and protects your information when you
        use our mobile application and services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. About Us</h2>
      <p className="mb-4">
        <strong>Business Name:</strong> Spice Direct Wholesale LTD
        <br />
        <strong>Website:</strong>{" "}
        <a href="https://www.spicedirectwholesale.co.uk" className="text-blue-600 underline">
          www.spicedirectwholesale.co.uk
        </a>
        <br />
        <strong>Privacy Policy URL:</strong>{" "}
        <a
          href="https://www.spicedirectwholesale.co.uk/app-privacy-policy"
          className="text-blue-600 underline"
        >
          www.spicedirectwholesale.co.uk/app-privacy-policy
        </a>
        <br />
        <strong>Contact Email:</strong>{" "}
        <a href="mailto:orders@spicedirectwholesale.co.uk" className="text-blue-600 underline">
          orders@spicedirectwholesale.co.uk
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>

      <p className="mb-4">We collect the following information when you use our app:</p>

      <ul className="list-disc ml-6 mb-4">
        <li>Name</li>
        <li>Email Address</li>
        <li>User ID</li>
        <li>Customer ID</li>
        <li>Order History</li>
        <li>Device Information (mobile model, OS version)</li>
        <li>Push Notification Token</li>
      </ul>

      <p className="mb-4">
        This information is collected to create accounts, manage orders, send notifications,
        and improve our services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        3. How We Collect Information
      </h2>

      <p className="mb-4">We collect data through:</p>

      <ul className="list-disc ml-6 mb-4">
        <li>User Account Registration</li>
        <li>Order Placement</li>
        <li>Firebase Cloud Messaging (for Push Notifications)</li>
        <li>App usage analytics</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Technologies We Use</h2>

      <ul className="list-disc ml-6 mb-4">
        <li>
          <strong>Firebase Cloud Messaging (FCM):</strong> to send push notifications
        </li>
        <li>
          <strong>Notifee:</strong> for managing and displaying notifications
        </li>
        <li>
          <strong>Next.js API Routes:</strong> to securely handle backend requests
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. How We Use Your Information</h2>

      <ul className="list-disc ml-6 mb-4">
        <li>To create and manage your account</li>
        <li>To process and track orders</li>
        <li>To send important notifications (order status, offers, account updates)</li>
        <li>To improve app performance and user experience</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        6. Sharing of Information
      </h2>

      <p className="mb-4">
        We do <strong>NOT</strong> sell or share your personal information with third parties
        for marketing purposes.
      </p>

      <p className="mb-4">
        However, we may share limited data with trusted service providers such as:
      </p>

      <ul className="list-disc ml-6 mb-4">
        <li>Firebase (for notifications)</li>
        <li>Hosting providers</li>
        <li>Internal tools used to process orders</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Security</h2>

      <p className="mb-4">
        We use encryption, secure APIs, and strict internal controls to protect your
        information. Only authorized personnel can access your data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. User Rights</h2>

      <p className="mb-4">You can request:</p>

      <ul className="list-disc ml-6 mb-4">
        <li>Access to your data</li>
        <li>Correction of incorrect data</li>
        <li>Deletion of your account or data</li>
      </ul>

      <p className="mb-4">
        Requests can be made by emailing us at{" "}
        <a className="text-blue-600 underline" href="mailto:info@spicedirectwholesale.co.uk">
          info@spicedirectwholesale.co.uk
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Children’s Privacy</h2>

      <p className="mb-4">
        Our app is not intended for children under 13. We do not knowingly collect
        information from children.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        10. Changes to This Privacy Policy
      </h2>

      <p className="mb-4">
        We may update this Privacy Policy from time to time. Updates will be posted on this
        page and take effect immediately.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>

      <p className="mb-4">
        For any questions or concerns, please contact us at:
        <br />
        <strong>Email:</strong>{" "}
        <a href="mailto:orders@spicedirectwholesale.co.uk" className="text-blue-600 underline">
          orders@spicedirectwholesale.co.uk
        </a>
        <br />
        <strong>Business Name:</strong> Spice Direct Wholesale LTD
      </p>
    </div>
  );
}
