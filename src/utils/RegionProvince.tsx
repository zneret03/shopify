import React, { useEffect, useState } from "react";

interface regionPropTypes {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const GetRegion: React.FC<regionPropTypes> = ({ onChange, value }) => {
  const [region, setRegion] = useState(null);

  const getRegions = () => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://raw.githubusercontent.com/darklight721/philippines/master/regions.json"
      )
        .then((response) => {
          if (response) {
            return response.json();
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  };

  useEffect(() => {
    getRegions()
      .then((data: any) => {
        if (data) {
          setRegion(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <select
        onChange={onChange}
        value={value}
        name="region"
        className="border py-2 px-2 bg-white rounded w-full"
      >
        {region &&
          region.map((region: any) => (
            <option value={region.key} key={region.key}>
              {region.long}
            </option>
          ))}
      </select>
    </>
  );
};

interface provincePropsTypes {
  region: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const GetProvince: React.FC<provincePropsTypes> = ({
  region,
  onChange,
  value,
}) => {
  const [province, setProvince] = useState(null);

  const getProvince = () => {
    let provinceFiltered = null;

    fetch(
      "https://raw.githubusercontent.com/darklight721/philippines/master/provinces.json"
    )
      .then((response) => {
        if (response) {
          return response.json();
        }
      })
      .then((data) => {
        if (region) {
          provinceFiltered = data.filter(
            (output: any) => output.region === region
          );
          setProvince(provinceFiltered);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(getProvince, [province]);

  return (
    <>
      <select
        className="border py-2 px-2 bg-white rounded w-full"
        onChange={onChange}
        name="province"
        value={value}
      >
        {province &&
          province.map((province: any) => (
            <option value={province.key} key={province.key}>
              {province.name}
            </option>
          ))}
      </select>
    </>
  );
};
