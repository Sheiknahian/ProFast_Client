import React from 'react';
import { DatabaseZap } from 'lucide-react'

const NoDataFound = () => {
    return (
        <div className="flex flex-col items-center justify-center mb-20 mt-5">
            <div className="bg-base-200 p-6 rounded-full">
                <DatabaseZap size={80} />
            </div>

            <h3 className="text-3xl font-bold mt-6">
                No Records Found
            </h3>

            <p className="text-base-content/70 mt-2">
                There are currently no records to display.
            </p>
        </div>
    );
};

export default NoDataFound;