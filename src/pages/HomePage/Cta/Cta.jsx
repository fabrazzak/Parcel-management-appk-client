import { Button } from '@/src/components/ui/button';
import { Link } from 'react-router-dom';


const Cta = () => {
    return (
        <div>
            <section className="py-16 bg-gradient-to-r from-purple-500 to-purple-700 dark:from-black dark:to-black text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Get Your Parcel Delivered Now!</h2>
                <p className="text-lg mb-6">Fast, secure, and reliable parcel management.</p>
                <Link to='/dashboard/book-parcel'><Button className="text-lg px-8 py-3 bg-black dark:bg-white hover:bg-gray-800">Book a Parcel</Button></Link>
            </section>

        </div>
    );
};

export default Cta;