import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';

const AddListing = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    // latitudes: 0,
    // longtidues: 0,
  });

  const {
    type, name, bedrooms, bathrooms, parking, furnished, address, description,
    offer, regularPrice, discountedPrice, images,
  } = formData;

  // FormData must include the ID of the logged in user
  // onAuthStateChanged returns the currently logged in user
  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Update the FormData object with the user id
        setFormData({
          ...formData,
          userRef: user.uid,
        });
      } else {
        navigate('/sign-in');
      }
    });
  }, []);

  const handleListingSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check the prices
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error('Discounted price must be less than regular price!');
    }

    // Limit on the number of images
    if (images.length > 6) {
      setLoading(false);
      toast.error('You can not submit more than 6 images');
    }

    // Handle image uploads
    // Firebase only handle a single image, so create a function to run for
    // the different image uploads
    // Documentation: https://firebase.google.com/docs/storage/web/upload-files
    const storageImage = async (image) => new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

      // Create a storage reference
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the
          // total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('Invalid state');
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        });
    });

    // Call the storage on all the uploaded images
    const imgUrls = await Promise.all(
      [...images].map((image) => storageImage(image)),
    ).catch(() => {
      setLoading(false);
      toast.error('Error while uploading photos.');
    });

    // Save the listing information into the collection
    // Get the copy of the data
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };

    // Delete the images object before saving
    delete formDataCopy.images;
    // !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    setLoading(false);

    toast.success('Listing saved successfully');
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);

    setLoading(false);
  };

  const handleInput = (e) => {
    // Handle booleans
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }

    if (e.target.value === 'false') {
      boolean = false;
    }

    // Handle files or images
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Handle numbers, text and booleans
    if (!e.target.files) {
      const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-0 md:px-5 lg:px-10">
      <header>
        <h1 className="text-center py-8 text-xl font-extrabold text-green-500 lg:text-3xl">
          Submit Your Listing Today
        </h1>
      </header>
      <main>
        <form onSubmit={handleListingSubmission}>
          {/* Sale or rental */}
          <div className="form-div">
            <label htmlFor="sale-rent" className="form-label">
              Sale / Rent
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                className={type === 'rent' ? 'activeFormButton' : 'formButton'}
                id="type"
                value="rent"
                onClick={handleInput}
              >
                Rent
              </button>
              <button
                type="button"
                className={type === 'sale' ? 'activeFormButton' : 'formButton'}
                id="type"
                value="sale"
                onClick={handleInput}
              >
                Sale
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="form-div">
            <label htmlFor="name" className="form-label">
              Name
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Name of listing"
                onChange={handleInput}
                className="form-inputs"
                required
              />
            </label>
          </div>
          <div className="form-div">
            <label htmlFor="bedrooms" className="form-label">
              Bedrooms
              <input
                type="number"
                id="bedrooms"
                min="0"
                value={bedrooms}
                onChange={handleInput}
                className="form-inputs"
                required
              />
            </label>
          </div>
          <div className="form-div">
            <label htmlFor="bathrooms" className="form-label">
              Bathrooms
              <input
                type="number"
                id="bathrooms"
                min="0"
                value={bathrooms}
                onChange={handleInput}
                className="form-inputs"
                required
              />
            </label>
          </div>

          {/* Parking */}
          <div className="form-div">
            <label htmlFor="furnished" className="form-label">Parking</label>
            <div className="flex gap-3">
              <button
                className={parking ? 'activeFormButton' : 'formButton'}
                type="button"
                id="parking"
                value
                onClick={handleInput}
              >
                Yes
              </button>
              <button
                className={!parking && parking !== null ? 'activeFormButton' : 'formButton'}
                type="button"
                id="parking"
                value={false}
                onClick={handleInput}
              >
                No
              </button>
            </div>
          </div>

          {/* Furnished */}
          <div className="form-div">
            <label htmlFor="furnished" className="form-label">Furnished</label>
            <div className="flex gap-3">
              <button
                className={furnished ? 'activeFormButton' : 'formButton'}
                type="button"
                id="furnished"
                value
                onClick={handleInput}
              >
                Yes
              </button>
              <button
                className={!furnished && furnished !== null ? 'activeFormButton' : 'formButton'}
                type="button"
                id="furnished"
                value={false}
                onClick={handleInput}
              >
                No
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="form-div">
            <label htmlFor="Address" className="form-label">
              Address
              <input
                name="address"
                id="address"
                value={address}
                onChange={handleInput}
                cols="30"
                rows="5"
                className="form-inputs"
                placeholder="Address"
                required
              />
            </label>
          </div>

          {/* Address */}
          <div className="form-div">
            <label htmlFor="Description" className="form-label">
              Description
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={handleInput}
                cols="30"
                rows="5"
                className="form-inputs"
                placeholder="Describe the listing ..."
                required
              />
            </label>
          </div>

          {/* Offer */}
          <div className="form-div">
            <label htmlFor="offer" className="form-label">Offer</label>
            <div className="flex gap-3">
              <button
                className={offer ? 'activeFormButton' : 'formButton'}
                type="button"
                id="offer"
                value
                onClick={handleInput}
              >
                Yes
              </button>
              <button
                className={!offer && offer !== null ? 'activeFormButton' : 'formButton'}
                type="button"
                id="offer"
                value={false}
                onClick={handleInput}
              >
                No
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="form-div">
            <label htmlFor="regular-price" className="form-label">
              <span>Regular Price</span>
              {formData.type === 'rent' && <span className="font-thin"> (UgX per Month)</span>}
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={handleInput}
                className="form-inputs"
                required
              />
            </label>
          </div>
          {/* Incase of an offer */}
          {offer && (
            <div className="form-div">
              <label htmlFor="discountedPrice" className="form-label">
                Discounted Price
                <span className="font-thin"> (UgX per Month)</span>
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={handleInput}
                  required={offer}
                  className="form-inputs"
                />
              </label>
            </div>
          )}
          {/* Images */}
          <div className="form-div">
            <label htmlFor="Images" className="form-label">
              Images
              <p className="font-thin py-3 text-gray-600">Upload a maximum of 6 images. First image will be the cover.</p>
              <input
                className=""
                type="file"
                id="images"
                onChange={handleInput}
                max="6"
                // value={images}
                accept=".jpg, .png, .gif, .jpeg, .webp"
                multiple
                required
              />
            </label>
          </div>
          {/* Submit */}
          <div
            className="mt-4 flex justify-center"
          >
            <button
              type="submit"
              className="btn btn-primary"
            >
              Create Listing
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddListing;
