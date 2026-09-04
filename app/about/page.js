export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-8">About Us</h1>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-muted">
                <p className="text-lg text-muted-foreground mb-4">
                    Welcome to Wristyle, your ultimate destination for premium timepieces and exquisite jewelry.
                    We are passionate about craftsmanship, quality, and timeless elegance.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                    Our mission is to bring you a curated selection of the finest watches and jewelry from around the world,
                    ensuring every piece tells a unique story of artistry and precision.
                </p>
                <p className="text-lg text-muted-foreground">
                    At Wristyle, we believe that luxury should be accessible and that every accessory should be a reflection of your personal style.
                    Thank you for choosing us to be a part of your journey.
                </p>
            </div>
        </div>
    );
}