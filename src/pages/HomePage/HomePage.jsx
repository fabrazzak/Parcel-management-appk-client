import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import FeaturesCard from "./FeaturesCard/FeaturesCard";
import Statistics from "./Statistics/Statistics";
import TopDeliveryMen from "./TopDeliveryMan/TopDeliveryMan";
import HowItWork from "./HowItWork/HowItWork";




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


        </div>
    );
};

export default HomePage;