import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, selectDevicesData } from "../features/deviceSlice";

function Content() {
  const dispatch = useDispatch();
  const data = useSelector(selectDevicesData);

  useEffect(() => {
    dispatch(fetchDevices());
  }, []);

  return (
    <>
      <div className="grow">
        <p className="text-lg">List of devices</p>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Model</th>
                <th>Vendor</th>
                <th>Primary Hardware Type</th>
                <th>OS Name</th>
                <th>OS Version</th>
                <th>Browser Name</th>
                <th>Browser Rendering Engine</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                return (
                  <tr key={row.deviceId}>
                    <th>{row.deviceId}</th>
                    <td>{row.model}</td>
                    <td>{row.vendor}</td>
                    <td>{row.primaryHardwareType}</td>
                    <td>{row.osName}</td>
                    <td>{row.osVersion}</td>
                    <td>{row.browserName}</td>
                    <td>{row.browserRenderingEngine}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Content;
