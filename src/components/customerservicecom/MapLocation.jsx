'use client';
const MapLocation = () => {
  return (
    <section className="w-5/6 mx-auto">
        <div>
          <h4 className="font-semibold text-secondary">SPICE DIRECT WHOLESALE</h4>
          <h6 className="text-sm text-primary">225 Bernard Street G403NX Glasgow UK</h6>
        </div>
        <div className="relative w-full h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2236.655402305493!2d-4.420215223244186!3d55.90333537314034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48884f21937790d3%3A0x8bd35aa7ebfa2229!2sSpice%20Direct!5e0!3m2!1sen!2sae!4v1734955711741!5m2!1sen!2sae&maptype=satellite"
        width="100%" 
        height="100%" 
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full rounded-lg"
      />
    </div>
      </section>
  )
}

export default MapLocation