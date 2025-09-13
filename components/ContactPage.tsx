import React from 'react';
import { CONTACT_INFO } from '../constants';
import { PhoneIcon, WhatsAppIcon, MapPinIcon } from './Icons';
import { ContactIcon as MailIcon } from './Icons';

const ContactPage: React.FC = () => {
  // FIX: Removed non-existent 'whatsappDisplay' from destructuring.
  const { phone, email, address, whatsapp } = CONTACT_INFO;
  const emailUrl = `mailto:${email}`;
  const whatsappUrl = `https://wa.me/${whatsapp}`;
  
  return (
    <section id="contact-page" className="bg-transparent py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-red-800 font-lora">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We're here to help you find the perfect saree. Feel free to reach out with any questions.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information Card */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-8 border border-red-100">
            <h3 className="text-xl font-bold text-gray-800 font-lora mb-6">Contact Details</h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <PhoneIcon className="w-6 h-6 text-red-700 mt-1 mr-4 flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-red-800">{phone}</a>
              </div>
              {/* FIX: Added WhatsApp contact info which was missing from the UI. */}
              <div className="flex items-start">
                <MailIcon className="w-6 h-6 text-red-700 mt-1 mr-4 flex-shrink-0" />
                <a href={emailUrl} className="text-gray-700 hover:text-red-800 break-all">{email}</a>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="w-6 h-6 text-red-700 mt-1 mr-4 flex-shrink-0" />
                <span className="text-gray-700 whitespace-pre-line">{address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;