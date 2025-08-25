import Organisation from '../models/Org.model.js';

const getAdminDashboardData = async (req, res) => {
    try {
        const allDonors = await Organisation.find({ role: 'donor' });
        const allReceivers = await Organisation.find({ role: 'reciever' });
        res.status(200).json({
            success: true,
            message: "Admin dashboard data fetched successfully.",
            data: {
                donors: allDonors,
                receivers: allReceivers,
            }
        });
    } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default getAdminDashboardData;