import React, { useState } from "react";
import Line from "../../assets/line.png";

const Banquet360View = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<{ id: number; src: string } | null>(null);

  const views = [
    {
      id: 1,
      src: "https://www.google.com/maps/embed?pb=!4v1767361994296!6m8!1m7!1sCAoSLEFGMVFpcE1DakRMSXhNdkNWVk9rNzFONEFuUkotSHc5UW9oWXB0NjYydVA4!2m2!1d19.9619722!2d73.7498889!3f0!4f0!5f0.7820865974627469"
    },
    {
      id: 2,
      src: "https://www.google.com/maps/embed?pb=!4v1767362018598!6m8!1m7!1sCAoSLEFGMVFpcE92TUZMUEtpeXMtZTQtSlpsSFBKUlN2Q3l6MTV1UHJZWFVmY3BP!2m2!1d19.9619722!2d73.7498889!3f180!4f10!5f0.7820865974627469"
    },
  ];

  const openModal = (view: { id: number; src: string }) => {
    setCurrentView(view);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentView(null);
  };

  return (
    <div className="text-xl sm:text-4xl lg:text-4xl font-playfair text-primary mb-1 lg:mb-2">
      <div className="max-w-7xl px-6 lg:px-8 xl:px-32 py-10 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-xl sm:text-4xl font-bold text-primary font-playfair mb-2">
            Virtual Tour of our Luxurious Banquet Hall
          </h1>
          <p className="text-xs lg:text-lg text-gray-700 font-inter max-w-3xl mx-auto leading-relaxed mb-2">
            Explore our premium banquet hall from every angle
          </p>
          <div className="flex justify-center">
            <img
              src={Line}
              alt="Decorative Line"
              className="w-40 md:w-52 lg:w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6">
          {views.map((view) => (
            <div key={view.id} className="relative group">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <iframe
                    src={view.src}
                    className="w-full h-80 object-cover"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`360 View ${view.id}`}
                  ></iframe>
                  
                  <div
                    onClick={() => openModal(view)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <div className="text-white text-center font-inter">
                      <div className="bg-white bg-opacity-20 rounded-full p-4 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M8 12l4 4 4-4"/>
                        </svg>
                      </div>
                      <p className="text-sm font-semibold">Click to View in 360°</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 font-inter">
                  <div className="group relative bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-full hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:from-primary hover:to-primary/80 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openModal(view)}
                        className="font-medium text-sm sm:text-base"
                      >
                        Explore 360° View
                      </button>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && currentView && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black bg-opacity-90"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white p-1 rounded-md max-w-6xl w-full mx-4">
            <button
              className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300 transition-all duration-200"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe
              src={currentView.src}
              className="w-full h-[400px] lg:h-[650px] rounded-lg"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Enlarged 360 View ${currentView.id}`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banquet360View;
