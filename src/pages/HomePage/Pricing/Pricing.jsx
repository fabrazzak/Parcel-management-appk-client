import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const pricing = [
        { weight: "Up to 1kg", price: "50Tk", features: ["Fast Delivery", "Live Tracking"] },
        { weight: "Up to 2kg", price: "100Tk", features: ["Fast Delivery", "Priority Support"] },
        { weight: "Above 2kg", price: "150Tk", features: ["Fast Delivery", "Express Service"] }
      ];
    return (
        <div>
            <section className="py-16   text-center">
      <h2 className="text-3xl font-bold mb-8">Our Pricing</h2>
      <div className="grid md:grid-cols-3 gap-6 justify-center  max-w-[1200px] mx-auto">
        {pricing.map((plan, index) => (
          <Card key={index} className=" text-center p-6 bg-white dark:bg-black shadow-md rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <CardContent>
              <h3 className="text-xl font-semibold">{plan.weight}</h3>
              <p className="text-3xl font-bold text-primary my-4">{plan.price}</p>
              <ul className="text-gray-400 mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
             <Link to="/dashboard/book-parcel"> <Button className="w-full bg-primary hover:bg-primary/80">Choose Plan</Button></Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
            
        </div>
    );
};

export default Pricing;