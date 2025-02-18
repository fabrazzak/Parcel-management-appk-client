import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import FeaturesCard from "./FeaturesCard/FeaturesCard";
import Statistics from "./Statistics/Statistics";
import TopDeliveryMen from "./TopDeliveryMan/TopDeliveryMan";
import HowItWork from "./HowItWork/HowItWork";
import Testimonials from "./Testimonials/Testimonials";
import Pricing from "./Pricing/Pricing";
import Cta from "./Cta/Cta";




const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title> Home  || Parcel Management </title>
            </Helmet>
            <Banner></Banner>
            <FeaturesCard></FeaturesCard>
            <Statistics></Statistics>
            <TopDeliveryMen></TopDeliveryMen>
            <HowItWork></HowItWork>
            <Testimonials></Testimonials>
            <Pricing></Pricing>
            <Cta></Cta>


        </div>
    );
};

export default HomePage;