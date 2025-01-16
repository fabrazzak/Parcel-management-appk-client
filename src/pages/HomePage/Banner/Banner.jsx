import bgJson from '../../../assets/lottiFile/homeBanner.json';
import Lottie from 'lottie-react';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';

const Banner = () => {
    return (
        <div className="relative flex items-center justify-center md:h-screen h-[350px] overflow-hidden md:max-w-[1920px] mx-auto">
            {/* Lottie Animation as Background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Lottie animationData={bgJson} loop={true} className="w-full object-cover" />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl font-bold lg:text-6xl mb-4">
                    Welcome to Our Platform
                </h1>
                <p className="text-lg lg:text-xl mb-6">
                    Discover the best solutions tailored just for you.
                </p>

                {/* Search Bar */}
                <div className="flex items-center justify-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search here..."
                        className="w-full max-w-md px-4 py-2 rounded-md bg-white text-black"
                    />
                    <Button className="px-4 py-2 bg-[#9538E2] text-white font-semibold rounded-md hover:bg-[#7b2cbf]">
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
