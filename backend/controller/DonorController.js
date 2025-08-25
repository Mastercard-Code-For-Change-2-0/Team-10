import Organisation from '../models/Org.model.js';

const getDonorDashboardData = async (req, res) => {
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
            message: "Donor dashboard data fetched successfully.",
            data: {
                profile: userProfile,
            }
        });

    } catch (error) {
        console.error("Error fetching donor dashboard data:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default getDonorDashboardData;