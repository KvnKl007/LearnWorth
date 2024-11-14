
import Navbar from '../components/Navbar';
import aboutHeroImage from '../../public/assets/images/about.jpg'; // Replace with the actual image path
import features from '../../public/assets/Data/FeaturesData'; // Import features data
import Footer from '../components/Footer';

const AboutUsPage = () => {
    return (
        <>
            <Navbar />
            <div className="w-full">
                {/* Hero Section */}
                <section className="relative w-full h-80 md:h-96">
                    <img
                        src={aboutHeroImage}
                        alt="About Us Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-blue-600 text-4xl md:text-5xl font-bold">About Us</h1>
                    </div>
                </section>

                {/* About Us Content */}
                <section className="max-w-6xl mx-auto p-6 md:py-12 text-center md:text-left">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-6">What We Do</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        At <span className="font-semibold text-blue-600">LearnWorth</span>, our mission is to empower students in Rwanda with essential financial knowledge and skills. Our platform provides free, high-quality educational resources designed to improve financial literacy, helping users build a foundation for a financially secure future.
                    </p>

                    {/* Provide More Details */}
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">What We Offer</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-12">
                        We offer a variety of resources, including courses on personal finance, budgeting, and investment strategies. Our aim is to make financial education accessible and engaging for all.
                    </p>
                </section>

                {/* Features Showcase */}
                <section className="bg-gray-50 py-12">
                    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden p-6 transition transform hover:scale-105 hover:shadow-xl">
                                <img src={feature.icon} alt={feature.title} className="h-16 w-16 mx-auto mb-4" />
                                <h4 className="text-xl font-semibold text-blue-600 mb-2 text-center">{feature.title}</h4>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUsPage;
