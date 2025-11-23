import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
    return (
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">Create Account</h1>
                    <p className="text-muted-foreground">Join Wristyle today</p>
                </div>

                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "shadow-lg",
                        }
                    }}
                    routing="hash"
                />
            </div>
        </div>
    );
}
