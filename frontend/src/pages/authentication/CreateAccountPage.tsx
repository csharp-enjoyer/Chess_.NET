import { ChangeEvent, useState, useRef, useEffect } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

const CreateAccountPage = () => {
  // Real image, that will be saved
  const [originalImage, setOriginalImage] = useState<string>(
    "/src/assets/web/icons/auth/avatar.svg"
  );
  // Pre-real image, that user cropping
  const [croppedImage, setCroppedImage] = useState<string>(originalImage);

  const [cropper, setCropper] = useState<Cropper | null>(null);
  // Modal window for cropper
  const [showModal, setShowModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCroppedImage(reader.result as string);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleCrop = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
      });
      const croppedImageBase64 = croppedCanvas.toDataURL("image/png");
      setCroppedImage(croppedImageBase64);
      setOriginalImage(croppedImageBase64);
      setShowModal(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropperInit = () => {
    if (imgRef.current) {
      if (cropper) {
        cropper.destroy();
        setCropper(null);
      }

      const newCropper = new Cropper(imgRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        ready() {
          setCropper(newCropper);
        },
      });
    }
  };

  useEffect(() => {
    if (!showModal && cropper) {
      cropper.destroy();
      setCropper(null);
      setCroppedImage(originalImage);
    }
  }, [showModal, cropper, originalImage]);

  // Username input
  const [usernameText, setUsernameText] = useState("");
  const handleChangeUsernameText = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameText(e.target.value);
  };

  // Password input
  const [passwordText, setPasswordText] = useState("");
  const handleChangePasswordText = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordText(e.target.value);
  };

  // Confirm password input
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const handleChangeConfirmPasswordText = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordText(e.target.value);
  };

  // All fields must be not empty
  const readyToContinue = () => {
    return !!usernameText && !!passwordText && !!confirmPasswordText;
  };

  return (
    <>
      <div className="container">
        <div className="flex-column flex-center max-height">
          <h1>Create your account</h1>
          <div className="even-columns padding-block-300">
            <div className="img-container">
              <img
                ref={imgRef}
                src={croppedImage}
                alt="avatar"
                className="avatar-wrapper"
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleUploadImage}
                accept="image/*"
              />
              <label data-center htmlFor="" className="label">
                Profile
              </label>
            </div>
            <div className="input-fields">
              <div className="max-width padding-block-300">
                <label htmlFor="" className="label">
                  Username
                </label>
                <div className="input-container">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your username..."
                    value={usernameText}
                    onChange={handleChangeUsernameText}
                  />
                </div>
              </div>

              <div className="max-width padding-block-300">
                <label className="label">Password</label>
                <div className="input-container">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter your password..."
                    value={passwordText}
                    onChange={handleChangePasswordText}
                  />
                </div>
              </div>
              <div className="max-width padding-block-300">
                <label className="label">Confirm your password</label>
                <div className="input-container">
                  <input
                    className="input"
                    type="password"
                    placeholder="Repeat password..."
                    value={confirmPasswordText}
                    onChange={handleChangeConfirmPasswordText}
                  />
                </div>
              </div>
            </div>
          </div>

          <button className="button no-wrap" disabled={!readyToContinue()}>
            Start playing
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="secondary-heading flex-center padding-block-200">
              Crop Image
            </h2>
            <div>
              <img
                ref={imgRef}
                src={croppedImage}
                alt="avatar"
                onLoad={handleCropperInit}
              />
            </div>
            <div className="padding-block-200 flex-center row-flow">
              <button className="button" onClick={handleCrop}>
                Crop
              </button>
              <button className="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAccountPage;
