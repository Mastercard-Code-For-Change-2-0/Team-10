import Organisation from '../models/Org.model.js';

const getReceiverDashboardData = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const userProfile = await Organisation.findOne({ email: userEmail });

        if (!userProfile) {
            return res.status(404).json({
                message: "User profile not found.",
                success: false
            });
        }
        res.status(200).json({
            success: true,
            message: "Receiver dashboard data fetched successfully.",
            data: {
                profile: userProfile,
            }
        });

    } catch (error) {
        console.error("Error fetching receiver dashboard data:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default getReceiverDashboardData;