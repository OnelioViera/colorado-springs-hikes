import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Colorado Springs Hikes",
  description: "Get in touch with us about hiking trails in Colorado Springs.",
};

const query = groq`
  *[_type == "contact"][0] {
    _id,
    title,
    subtitle,
    formFields[] {
      id,
      label,
      type,
      placeholder,
      required
    },
    submitButtonText,
    successMessage,
    errorMessage
  }
`;

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  try {
    const data = await client.fetch(query);

    if (!data) {
      return (
        <main className="min-h-screen pt-24 pb-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600">
              Contact form is being configured. Please check back later!
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h1>
              {data.subtitle && (
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {data.subtitle}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Have questions about hiking trails in Colorado Springs?
                    We're here to help! Whether you're looking for trail
                    recommendations, want to share your hiking experiences, or
                    have suggestions for improving our guides, we'd love to hear
                    from you.
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Response Time
                    </h3>
                    <p className="text-gray-600">
                      We typically respond to messages within 24-48 hours during
                      business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ContactForm
                  fields={data.formFields}
                  submitButtonText={data.submitButtonText}
                  successMessage={data.successMessage}
                  errorMessage={data.errorMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return (
      <main className="min-h-screen pt-24 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            There was an error loading the contact form. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}
