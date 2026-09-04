export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-8">Contact Us</h1>
            <div className="bg-white p-8 rounded-lg border border-muted grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Contact Information */}
                <div>
                    <p className="text-lg text-muted-foreground mb-6">
                        Have a question or need assistance? We're here to help! Please reach out to us using the contact details provided.
                    </p>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-primary">Our Details</h2>
                        <p className="text-lg text-muted-foreground">Email: support@wristyle.com</p>
                        <p className="text-lg text-muted-foreground">Phone: +1 (555) 123-4567</p>
                        <p className="text-lg text-muted-foreground">Address: 123 Watch Avenue, Time City, TC 90210</p>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div>
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border border-muted rounded-md focus:outline-none focus:border-primary"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-muted rounded-md focus:outline-none focus:border-primary"
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full px-4 py-2 border border-muted rounded-md focus:outline-none focus:border-primary"
                                placeholder="Inquiry about an order"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full px-4 py-2 border border-muted rounded-md focus:outline-none focus:border-primary"
                                placeholder="Type your message here..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-primary-foreground py-3 px-6 rounded-md font-bold hover:opacity-90 transition-opacity"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}