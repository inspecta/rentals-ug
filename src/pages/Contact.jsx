import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  useParams, useSearchParams, useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../styled-components/StyledComponents';
import Spinner from '../components/Spinner';
import { db } from '../firebase.config';

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [searchParams] = useSearchParams();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwner = async () => {
      const docRef = doc(db, 'users', params.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
        setLoading(false);
      } else {
        toast.error("Couldn't fetch onwer details.");
      }
    };

    fetchOwner();
  }, [params.ownerId]);

  const { name, phone, message } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <div className="font-bold mb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-800 px-3 text-white hover:text-gray-400"
        >
          Back
        </button>
      </div>
      <div className="px-4 py-8 bg-white mt-10 mb-10 rounded-lg lg:px-20 lg:mb-0">
        <header className="text-center">
          <p className="text-[#5ea51e] font-bold p-4">PROPERTY OWNER</p>
          <h1 className="py-10 pt-0 text-4xl font-extrabold">
            Owner:
            {' '}
            {owner.name}
          </h1>
        </header>

        {owner !== null && (
        <div className="p-3">
          <form>
            <div>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="form-inputs"
                  value={name}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="phone">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Your phone no."
                  className="form-inputs"
                  value={phone}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="message">
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  placeholder="Your message to the owner"
                  className="form-inputs"
                  value={message}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <a
              href={`mailto:${owner.email}?Subject=${searchParams.get('listingName')}&body=${message}`}
              className="btn btn-primary"
            >
              <button type="button">Send message</button>
            </a>
          </form>
        </div>
        )}
      </div>
    </Container>
  );
};

export default Contact;
