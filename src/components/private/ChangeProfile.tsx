import React, { useState, useContext } from "react";
import { X } from "react-feather";
import { Spin } from "antd";
import { app } from "../../config/firebase";
import { animated } from "react-spring";
import { ReducerContext } from "../../Context/ReducerProvider";
import { AuthContext } from "../../auth/AuthProvider";
import httpRequest from "../../api/httpRequest";

interface PropTypes {
  style: Object;
  imageUrl: string;
}

const ChangeProfile: React.FC<PropTypes> = ({ style, imageUrl }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [profile, setProfilePicture] = useState({ status: false, image: null });
  const [error, setError] = useState(false);
  const [Spinner, setSpinner] = useState(false);

  const { dispatch, toggleProfile } = useContext(ReducerContext);
  const currentUser: any = useContext(AuthContext);

  //*Untoggle modal
  const unToggleModal = () => {
    dispatch({
      type: "toggleProfile",
      payload: { toggleProfile: !toggleProfile },
    });
  };

  //**Change and preview profile picture
  const imageOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageSelected = event.target.files[0];

    const ALLOWED_TYPES = ["image/jpeg", "image/jpg"];

    if (imageSelected && ALLOWED_TYPES.includes(imageSelected.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      setError(false);
      setProfilePicture({ status: true, image: imageSelected });
      reader.readAsDataURL(imageSelected);
    } else {
      setError(true);
    }
  };

  //*Remove selected image
  const onRemoveProfile = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (profile.status) {
      setImagePreview(null);
      setProfilePicture({ status: false, image: null });
    }
  };

  const httpApi = (imageUrl: string) => {
    try {
      setSpinner(true);

      httpRequest
        .put(
          "/api/index?name=updateProfilePicture&component=productComponent",
          { id: currentUser.uid, imageUrl }
        )
        .then(() => {
          setTimeout(() => {
            setSpinner(false);
            unToggleModal();
            setProfilePicture({ status: false, image: null });
          }, 4000);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  //*save image to firebase storage
  const updateProfile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (profile.status) {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(`UserProfile/${profile.image.name}`);
      await fileRef.put(profile.image);

      fileRef.getDownloadURL().then((imageUrl) => {
        httpApi(imageUrl);
      });
    }
  };

  const justifyCenter = "flex justify-center";
  return (
    <animated.div
      style={style}
      className={`flex justify-center bg-gray-200 absolute`}
    >
      <div className="max-w-2xl w-full bg-white">
        <span className="flex justify-end px-6 py-4 cursor-pointer">
          <X size="25" onClick={() => unToggleModal()} />
        </span>
        <section className="">
          <div className={justifyCenter}>
            <span className="text-3xl font-segoe-UI">Choose a Photo</span>
          </div>
          <div className={`${justifyCenter} mt-4`}>
            <div className="text-center text-sm max-w-sm">
              <span className="font-segoe-UI text-lg">
                Your photo should clearly as possible to avoid ugly profile
                picture
              </span>
            </div>
          </div>
          <div className={`text-center mt-6`}>
            <div className={justifyCenter}>
              {imagePreview !== null ? (
                <Spin spinning={Spinner}>
                  <div
                    className="w-40 h-40 object-cover rounded-full image-opacity cursor-pointer "
                    style={{
                      background: `url("${imagePreview}") no-repeat center/cover`,
                    }}
                  />
                </Spin>
              ) : (
                <>
                  {toggleProfile && (
                    <img
                      className="w-40 h-40 object-cover rounded-full"
                      src={imageUrl}
                      alt=""
                    />
                  )}
                </>
              )}
            </div>
            <div className={`${justifyCenter} mt-8`}>
              <label className="py-3 cursor-pointer w-full max-w-xs text-center text-white rounded-full bg-blue-500 hover:bg-blue-400">
                {profile.status ? (
                  <button
                    onClick={(event) => updateProfile(event)}
                    className="w-full max-w-xs text-center focus:outline-none text-white rounded-full bg-blue-500 hover:bg-blue-400"
                  >
                    Use this photo
                  </button>
                ) : (
                  <>
                    {toggleProfile && (
                      <>
                        <input
                          type="file"
                          className="bg-blue-500 py-1 px-4"
                          onChange={(event) => imageOnchange(event)}
                        />
                        Choose a new photo
                      </>
                    )}
                  </>
                )}
              </label>
            </div>
            <div className="mt-5">
              {imagePreview && toggleProfile ? (
                <span
                  className="font-bold text-blue-500 cursor-pointer"
                  onClick={(event) => onRemoveProfile(event)}
                >
                  Remove photo
                </span>
              ) : (
                <>
                  {toggleProfile && (
                    <span
                      onClick={() => unToggleModal()}
                      className="font-bold text-blue-500 cursor-pointer"
                    >
                      Keep this photo
                    </span>
                  )}
                </>
              )}
            </div>

            {error && (
              <div className="text-center mt-3">
                <span className="text-red-500 font-bold">
                  File is not supported
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </animated.div>
  );
};

export default ChangeProfile;
