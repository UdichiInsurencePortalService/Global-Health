// DocumentSection.jsx
import { Modal } from "antd";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";

const DocumentSection = ({ sectionTitle, sectionDescription, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShow = (item) => {
    const normalizedItem = {
      ...item,
      requirement: item.requirement || item.REQUIREMENT,
    };
    setSelectedItem(normalizedItem);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="document-section">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center text-center py-3">
            <h1>{sectionTitle}</h1>
          </div>
          <div className="col-12 d-flex justify-content-center py-3">
            <p className="text-center">{sectionDescription}</p>
          </div>
        </div>

        <div className="row">
          {data.map((item, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6 col-sm-12 py-5"
              onClick={() => handleShow(item)}
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-lg text-center p-4 h-100 d-flex flex-column justify-content-between">
                <h4 className="fw-bold">{item.title}</h4>
                <div className="mt-3">
                  <FaArrowAltCircleRight size={30} color="#007bff" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          title={selectedItem?.title}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <ul>
            {selectedItem?.requirement?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </Modal>
      </div>
    </div>
  );
};

export default DocumentSection;
