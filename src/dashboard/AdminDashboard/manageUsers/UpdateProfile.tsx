import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userAPI } from "../../../features/users/userAPI";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

type UpdateProfileInputs = {
    firstName: string;
    lastName: string;
    address:string;
    contactPhone:string;
    email:string;
    image_url: string;
};

const schema = yup.object({
    firstName: yup.string().max(50, "Max 50 characters").required("First name is required"),
    lastName: yup.string().max(50, "Max 50 characters").required("Last name is required"),
    address: yup.string().max(50, "Max 50 characters").required("Address name is required"),
    email: yup.string().max(50, "Max 50 characters").required("Email is required"),
    contactPhone: yup.string().max(50, "Max 50 characters").required("Pnone contact is required"),
    image_url: yup.string().url("Invalid URL").required("Image URL is required"),
});

interface User {
    userID: string | number;
    firstName?: string;
    lastName?: string;
    address:string;
    contactPhone:string;
    email:string;
    image_url?: string;
}

interface UpdateProfileProps {
    user: User;
    refetch?: () => void;
}

const UpdateProfile = ({ user, refetch }: UpdateProfileProps) => {
    const [image, setImage] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation(
        { fixedCacheKey: "updateUser" }
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            address: user?.address || "",
            email: user?.email || "",
            contactPhone: user.contactPhone || "",
            image_url: user?.image_url || "",
        },
    });

    
    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName || "");
            setValue("lastName", user.lastName || "");
            setValue("address", user.address || "");
            setValue("email", user.email || "");
            setValue("contactPhone", user.contactPhone || "");
            setValue("image_url", user.image_url || "");
        } else {
            reset();
        }
    }, [user, setValue, reset]);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImage(file);
        }
    }

    const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
        try {
            console.log('Update Profile data:', data);
            let image_url = data.image_url
          
            if (image) {
                setIsUploading(true);
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'carlearning')
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dlv6jnahg/image/upload',
                    formData
                )
                console.log("Cloudinary response:", response.data);
                setIsUploading(false);
                if (response.data && response.data.secure_url) {
                    image_url = response.data.secure_url
                } else {
                    toast.error("Image upload failed. Please try again.");
                    return;
                }
            }

            await updateUser({ userID: Number(user.userID), ...data, image_url }).unwrap()

            toast.success("Profile updated successfully!");
            if (refetch) {
                refetch(); 
            }
            reset();
            (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
        } catch (error) {
            setIsUploading(false);
            console.log("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    return (
        <dialog id="update_profile_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg mb-4">Update Profile</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register("firstName")}
                        placeholder="First Name"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.firstName && (
                        <span className="text-sm text-red-700">{errors.firstName.message}</span>
                    )}

                    <input
                        type="text"
                        {...register("lastName")}
                        placeholder="Last Name"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.lastName && (
                        <span className="text-sm text-red-700">{errors.lastName.message}</span>
                    )}
                    <input
                        type="text"
                        {...register("email")}
                        placeholder="Email"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.email && (
                        <span className="text-sm text-red-700">{errors.email.message}</span>
                    )}
                    <input
                        type="text"
                        {...register("address")}
                        placeholder="Address"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.address && (
                        <span className="text-sm text-red-700">{errors.address.message}</span>
                    )}
                    <input
                        type="text"
                        {...register("contactPhone")}
                        placeholder="Phone Number"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.contactPhone&& (
                        <span className="text-sm text-red-700">{errors.contactPhone.message}</span>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">Upload Image</label>
                        <input
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs bg-white text-gray-800"
                        />

                        {
                            image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                                />
                            )
                        } 
                        

                    </div>

                    {errors.image_url && (
                        <span className="text-sm text-red-700">{errors.image_url.message}</span>
                    )}



                    <div className="modal-action flex flex-col sm:flex-row gap-2">
                        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isLoading || isUploading}>
                            {(isLoading || isUploading) ? (
                                <>
                                    <span className="loading loading-bars loading-xl" /> Updating...
                                </>
                            ) : "Update"}
                        </button>
                        <button
                            className="btn w-full sm:w-auto"
                            type="button"
                            onClick={() => {
                                (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
                                reset();
                            }}
                            disabled={isLoading || isUploading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default UpdateProfile;