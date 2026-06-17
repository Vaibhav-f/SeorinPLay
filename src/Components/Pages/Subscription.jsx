import React from 'react'

const Subscription = () => {
  const plans = [
    {
      name: "Basic",
      price: "₹199/month",
      features: [
        "HD Streaming",
        "1 Device",
        "Limited Downloads"
      ]
    },
    {
      name: "Premium",
      price: "₹499/month",
      features: [
        "4K Streaming",
        "4 Devices",
        "Unlimited Downloads"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white pt-24 px-5">
      <h1 className="text-4xl font-bold text-center mb-10">
        Choose Your Plan
      </h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-[#1b1b2f] rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-sky-400">
              {plan.name}
            </h2>

            <p className="text-3xl font-bold mt-4">
              {plan.price}
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>

            <button className="mt-8 w-full bg-sky-600 hover:bg-sky-700 h-11 rounded-full font-semibold">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Subscription