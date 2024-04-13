import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Image from "next/image";

export const Notifications = () => {
    return (

        <li className="dropdown stopevent ms-2">

            <a className="btn btn-ghost btn-icon rounded-circle" href="#!" role="button" id="dropdownNotification" data-bs-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
                <Image unoptimized className="colored-svg reset-styles ms-auto" src="/images/bell-alert.svg"
                     alt="profile" width="25" height="25"/>
            </a>

            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end" aria-labelledby="dropdownNotification">
                <div>
                    <div className="border-bottom px-3 pt-2 pb-3 d-flex justify-content-between align-items-center">
                        <p className="mb-0 text-dark fw-medium fs-4">Notifications</p>
                        <a href="#!" className="text-muted">
                            <Image unoptimized className="colored-svg reset-styles ms-auto" src="/images/settings.svg" alt="Settings" width="20" height="20"/>
                        </a>
                    </div>

                    <SimpleBar style={{height: '250px'}}>
                        <ul className="list-group list-group-flush notification-list-scroll">
                            {[...Array(4)].map((x, i) =>
                                // <li key={i} className="list-group list-group-flush notification-list-scroll">Some content</li>
                                <li key={i} className={`list-group-item ${i === 0 ? 'bg-light' : ''}`}>
                                    <a href="#!" className="text-muted">
                                        <h5 className="mb-1">Rishi Chopra</h5>
                                        <p className="mb-0">Mauris blandit erat id nunc blandit, ac eleifend dolor pretium.</p>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </SimpleBar>

                    <div className="border-top px-3 py-2 text-center">
                        <a href="#!" className="text-inherit ">
                            View all Notifications
                        </a>
                    </div>
                </div>
            </div>

        </li>
    );
}