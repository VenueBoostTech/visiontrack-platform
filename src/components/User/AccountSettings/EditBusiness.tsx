"use client";
import Card from "@/components/Common/Dashboard/Card";
import FormButton from "@/components/Common/Dashboard/FormButton";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Loader from "@/components/Common/Loader";

interface BusinessData {
    name: string;
    email: string;
    phone: string;
    address: string;
    vt_use_scenario: 'COMMERCIAL_REAL_ESTATE' | 'MANUFACTURING_WAREHOUSING' | 'MULTI_FAMILY_RESIDENTIAL' | 'RETAIL';
  }
  

export default function EditBusiness() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const isDemo = session?.user?.email?.includes("demo-");

  const [data, setData] = useState<BusinessData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    vt_use_scenario: "RETAIL" // default value
  });
  // Fetch initial business data when component mounts
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch('/api/business');
        if (response.ok) {
          const businessData = await response.json();
          setData({
            name: businessData.name || "",
            email: businessData.email || "",
            phone: businessData.phone || "",
            address: businessData.address || "",
            vt_use_scenario: businessData.vt_use_scenario || "RETAIL"
          });
        }
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const updateBusinessDetails = async (data: BusinessData) => {
    try {
      const res = await fetch("/api/business/update", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedBusiness = await res.json();

      if (res.status === 200) {
        toast.success("Business details updated successfully");
        setLoading(false);
        return updatedBusiness;
      } else if (res.status === 401) {
        setLoading(false);
        toast.error("Unauthorized to update business details");
      } else {
        setLoading(false);
        toast.error("Failed to update business details");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data || "An error occurred");
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDemo) {
      toast.error("Can't update demo business");
      return;
    }

    setLoading(true);
    await updateBusinessDetails(data);
  };

  return (
    <div className='w-full max-w-[525px]'>
      <Card>
        <h3 className='mb-9 font-satoshi text-custom-2xl font-bold tracking-[-.5px] text-dark dark:text-white'>
          Edit Business Details
        </h3>

        <form onSubmit={handleSubmit} className='space-y-5.5'>
          <InputGroup
            label='Business Name'
            name='name'
            placeholder='Enter Business Name'
            value={data.name}
            type='text'
            handleChange={handleChange}
            required
          />

          <InputGroup
            label='Business Email'
            name='email'
            placeholder='Enter Business Email'
            value={data.email}
            type='email'
            handleChange={handleChange}
          />

          <InputGroup
            label='Phone Number'
            name='phone'
            placeholder='Enter Phone Number'
            value={data.phone}
            type='tel'
            handleChange={handleChange}
          />

          <InputGroup
            label='Business Address'
            name='address'
            placeholder='Enter Business Address'
            value={data.address}
            type='text'
            handleChange={handleChange}
          />

        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Business Type</label>
            <select
                name="vt_use_scenario"
                value={data.vt_use_scenario}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md"
                >
                    <option value="RETAIL">Retail</option>
                    <option value="COMMERCIAL_REAL_ESTATE">Commercial Real Estate</option>
                    <option value="MANUFACTURING_WAREHOUSING">Manufacturing/Warehousing</option>
                    <option value="MULTI_FAMILY_RESIDENTIAL">Multi-family Residential</option>
                </select>
        </div>

          <FormButton>
            {loading ? (
              <>
                Saving <Loader style='border-white' />
              </>
            ) : (
              "Save Changes"
            )}
          </FormButton>
        </form>
      </Card>
    </div>
  );
}