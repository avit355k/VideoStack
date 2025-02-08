import React from "react";

const StoreInfo = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-8 px-4">
            <div className="max-w-3xl w-full space-y-6">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center">Store Information</h1>

                {/* FAQ Section */}
                <div className="space-y-4">
                    {/* Why Buy Used CDs and DVDs? */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Why buy used CDs and DVDs?</h2>
                        <p className="mt-2 text-gray-300">
                            Compact Discs and DVDs are perfect items to buy used because they never wear out.
                            A CD or DVD sounds or looks the same after the millionth play as it did when it was new.
                            By purchasing used discs instead of new ones, you can get twice as much music or twice as many movies
                            for half the price!
                        </p>
                    </div>

                    {/* Is Shopping Safe */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Is shopping online at The CD Exchange safe?</h2>
                        <p className="mt-2 text-gray-300">
                            Absolutely. Please read our{" "}
                            <a href="#" className="text-blue-400 underline">
                                Privacy Statement
                            </a>{" "}
                            for more details about this.
                        </p>
                    </div>

                    {/* Order Without Credit Card */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">
                            Can I place an order without a credit card?
                        </h2>
                        <p className="mt-2 text-gray-300">
                            Yes, we accept PayPal or money orders if you don't want to use a credit card.
                            When you go through the check-out procedure, you will be given this option.
                        </p>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">
                            Will you sell or give out my personal information?
                        </h2>
                        <p className="mt-2 text-gray-300">
                            We will NEVER sell or give out any of your personal information, including your email address.
                        </p>
                    </div>

                    {/* Business History */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">How long have you been in business?</h2>
                        <p className="mt-2 text-gray-300">
                            The CD Exchange has been selling used CDs on the Web since 1994, long before most people
                            had ever heard of the World Wide Web. We began selling DVDs in 2000.
                        </p>
                    </div>

                    {/* Do You Sell New CDs */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Do you sell new CDs & DVDs?</h2>
                        <p className="mt-2 text-gray-300">
                            No, we only sell previously-owned CDs & DVDs, but they're in like-new condition, and way cheaper.
                            That's the whole idea!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreInfo;
