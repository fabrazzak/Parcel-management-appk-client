import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Card, CardContent } from '@/src/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/src/components/ui/carousel';


const Testimonials = () => {
    const testimonials = [
        { name: "Amit Rahman", review: "Fast and reliable service! Highly recommended.", image: "/user1.jpg" },
        { name: "Sarah Karim", review: "Best parcel service I have used so far.", image: "/user2.jpg" },
        { name: "James Khan", review: "On-time delivery and great support team!", image: "/user3.jpg" },
      ];
    return (
        <div>
            <section className="py-16 bg-gradient-to-r from-purple-500 to-purple-700 dark:from-black dark:to-black/8 text-white text-center">
                <h2 className="text-3xl font-bold mb-8 dark:text-white">What Our Users Say</h2>
                <Carousel className="w-full max-w-3xl mx-auto">
                    <CarouselContent>
                        {testimonials.map((user, index) => (
                            <CarouselItem key={index} className="p-4">
                                <Card className="p-6 bg-white dark:bg-black shadow-md rounded-lg cursor-pointer transform transition-transform  hover:shadow-xl">
                                    <CardContent className="p-6">
                                        <Avatar className="mx-auto mb-4 w-20 h-20 ">
                                            <AvatarImage  src={user.image} alt={user.name} />
                                            <AvatarFallback >{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-lg font-semibold">{user.name}</h3>
                                        <p className="text-gray-400 mt-2">{user.review}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </section>

        </div>
    );
};

export default Testimonials;