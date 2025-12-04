import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useGetAllAddressQuery } from "../../redux/Admin/userAPI";
import { User as UserIcon, Mail, Phone, MapPin } from "lucide-react";

const UserCard = () => {
  const user = useSelector((state) => state.user);

  const { data, isLoading } = useGetAllAddressQuery({ userId: user.id }, {
    skip: !user.id,
  });

  const primaryAddress = data?.Address?.[0];

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-3 text-sm text-white/80"
    >
      {/* TOP: AVATAR + NAME + EMAIL */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
          <UserIcon size={20} className="text-white" />
        </div>

        <div className="min-w-0">
          <p className="text-white font-medium truncate">
            {user.name || "Guest User"}
          </p>
          <div className="flex items-center gap-1 text-xs text-white/60 truncate">
            <Mail size={12} /> <span className="truncate">{user.email}</span>
          </div>
        </div>
      </div>

      {/* PHONE */}
      {user.phone && (
        <div className="flex items-center gap-2 text-xs text-white/70">
          <Phone size={14} className="text-indigo-300" />
          <span>{user.phone}</span>
        </div>
      )}

      {/* ADDRESS */}
      <div className="mt-2">
        <div className="flex items-center gap-2 text-xs text-white/60 mb-1">
          <MapPin size={14} className="text-indigo-300" />
          <span className="uppercase tracking-wide text-[10px]">
            Delivery Address
          </span>
        </div>

        {isLoading ? (
          <p className="text-xs text-white/50">Loading address...</p>
        ) : primaryAddress ? (
          <div className="text-xs text-white/75 space-y-0.5">
            <p className="font-medium text-white">
              {primaryAddress.addressLine1}
            </p>
            {primaryAddress.addressLine2 && (
              <p>{primaryAddress.addressLine2}</p>
            )}
            <p>
              {primaryAddress.city}, {primaryAddress.state} -{" "}
              {primaryAddress.postalCode}
            </p>
          </div>
        ) : (
          <p className="text-xs text-white/50">
            No address added yet.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;
