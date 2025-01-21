import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import FeaturesCard from "./FeaturesCard/FeaturesCard";
import Statistics from "./Statistics/Statistics";



const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title> Home  || Parcel Management </title>
            </Helmet>
            <Banner></Banner>
            <FeaturesCard></FeaturesCard>
            <Statistics></Statistics>


        </div>
    );
};

export default HomePage;