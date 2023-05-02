import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkoutImg from "../assets/checkouttitle.jpg";
import { addBilling, getBilling } from "../store/slice/billingSlice";
import { getCarts, addToCart } from "../store/slice/cartSlice";
import { ClipLoader } from "react-spinners";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { _Login, _SignUp } from "../store/slice/authSlice";

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const [regopen, setRegOpen] = useState(false);
  const dispatch = useDispatch();
  const { getcart } = useSelector((state) => state.carts);

  const [openPassword, setOpenPassword] = useState(false);
  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, token, loggedin } = useSelector((state) => state.auth);
  const { getbilling } = useSelector((state) => state.bill);
  const { billing } = useSelector((state) => state.bill);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pword, setPword] = useState('')
  const [Email, setemail] = useState('')

  console.log(user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });

  const _login = () => {
    dispatch(
      _Login({
        email: email,
        password: password,
      })
    );
  };

  const _register = () => {
    dispatch(
      _SignUp({
        firstName: firstName,
        lastName: lastName,
        email: Email,
        password: pword,
      })
    );
  };

  const amount =
    cartItem &&
    Object.keys(getcart?.result?.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = getcart?.result?.cartItems[key];
      return totalPrice + price * qty;
    }, 0);

  const config = {
    public_key: "FLWPUBK_TEST-b2b1c951addae38b9d337399cf2074ba-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email,
      name: user?.firstName + "  " + user?.LastName,
    },
  };
  // const [address, setAddress] = useState('')
  const handleFlutterPayment = useFlutterwave(config);
  console.log(getbilling.status);
  const openLogin = () => {
    setOpen(!open);
    setRegOpen(false);


  };
  const openRegister = () => {
    setRegOpen(!regopen);
    setOpen(false);

  };
  const openPass = () => {
    setOpenPassword(!openPassword);
  };

  useEffect(() => {
    dispatch(getCarts());
  }, [loggedin.status]);

  useEffect(() => {
    if (loggedin.status === "successful") {
      dispatch(getBilling());
    }
  }, [cartItem]);

  console.log(user);

  useEffect(() => {
    setFormData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      address: getbilling?.result?.address?.address,
      phone: getbilling?.result?.address?.phone,
    });
  }, [getbilling, token]);

  useEffect(() => {
    setCartItems(getcart?.result?.cartItems);
  }, [getcart?.result?.cartItems]);

  function updateFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  console.log(formData.phone);

  const submitBiling = () => {
    const name = formData.firstName + " " + formData.lastName;

    const address = {
      name: name,
      email: formData?.email,
      address: formData?.address,
      phone: formData?.phone,
    };

    dispatch(addBilling(address));
  };
  const login = (
    <div className="mt-8">
      <p className="text-gray-800 text-[17px] tracking-tight">
        If you have shopped with us before, please enter your details below. If
        you are a new customer, please proceed to the Billing section.
      </p>
      <div className=" mt-8 text-gray-800">
        <p className="text-[15px] mb-1">Username or email *</p>
        <input
          className="outline-none px-4 py-2 md:py-6 border w-full "
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className=" mt-8 text-gray-800">
        <p className="text-[15px] mb-1">Password *</p>
        <input
          className="outline-none px-4 py-2 md:py-6 border w-full "
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={_login}
          className="py-3 px-3  md:py-4 md:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px]"
        >
          Login
        </button>
      </div>
    </div>
  );

  const register = (
    <div className="mt-8">
      <p className="text-gray-800 text-[17px] tracking-tight">
        If you are an new customer, please enter your details below.
      </p>
      <div className=" mt-8 text-gray-800">
        <p className="text-[15px] mb-1">First Name *</p>
        <input
          className="outline-none px-4 py-2 md:py-6 border w-full "
          value={firstName}
          type="name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className=" mt-8 text-gray-800">
        <p className="text-[15px] mb-1">Last Name *</p>
        <input
          className="outline-none px-4 py-2 md:py-6 border w-full "
          value={lastName}
          type="name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className=" mt-8 text-gray-800">
        <p className="text-[15px] mb-1">Email*</p>
        <input
          className="outline-none px-4 py-2 md:py-6 border w-full "
          value={Email}
          type="name"
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className=" mt-8 text-gray-800">
        <p className="text-[15px] mb-1">Password *</p>
        <input
          className="outline-none px-4 py-2 md:py-6 border w-full "
          value={pword}
          type="password"
          onChange={(e) => setPword(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={_register}
          className="py-3 px-3  md:py-4 md:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px]"
        >
          Register
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <div className="bg-[url('assets/checkouttitle.jpg')] bg-center bg-fixed bg-cover  h-[60vh]  w-full">
        <div className="flex items-center justify-center  h-full">
          <p className="text-white text-center font-semibold text-6xl">
            Checkout
          </p>
        </div>
      </div>
      <div className="lg:mx-20 mx-14 my-20 ">
        <div className="border border-gray-300 mb-4 text-gray-400  flex px-8 py-6 justify-between">
          <p>New customer?</p>
          <button onClick={openRegister}>Click here to Register</button>
        </div>
        {regopen === true && register}

        <div className="border border-gray-300 text-gray-400  flex px-8 py-6 justify-between">
          <p>Returning customer?</p>
          <button onClick={openLogin}>Click here to login</button>
        </div>

        {open === true && login}
        {getbilling.status === "successful" || getbilling.status === "idle" ? (
          <div className="mt-10">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="text-xl font-semibold ">Billing details</p>
                <div className="grid mt-10 grid-cols-2 gap-3">
                  <div>
                    <p className="text-base font-semibold mb-2">First name *</p>
                    <input
                      value={
                        formData.firstName === undefined
                          ? ""
                          : formData.firstName
                      }
                      className="outline-none px-4 py-2 md:py-4 border w-full"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold mb-2">First name *</p>
                    <input
                      value={
                        formData.lastName === undefined ? "" : formData.lastName
                      }
                      className="outline-none px-4 py-2 md:py-4 border w-full"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-base font-semibold mb-2">address</p>
                  <input
                    onChange={updateFormData}
                    name="address"
                    value={
                      formData.address === undefined || user === null
                        ? ""
                        : formData.address
                    }
                    className="outline-none px-4 py-2 md:py-4 border w-full"
                  />
                </div>
                <div className="mt-8">
                  <select className="px-4 py-2 md:py-4 outline-none  border w-full">
                    <option>Nogeria</option>
                  </select>
                </div>
                <div className="mt-8">
                  <p className="text-base font-semibold mb-2">Phone *</p>
                  <input
                    onChange={updateFormData}
                    name="phone"
                    value={
                      formData.phone === undefined || user === null
                        ? ""
                        : formData.phone
                    }
                    className="outline-none px-4 py-2 md:py-4 border w-full"
                  />
                </div>
                <div className="mt-8">
                  <p className="text-base font-semibold mb-2">
                    Email address *
                  </p>
                  <input
                    value={formData.email === undefined ? "" : formData.email}
                    className="outline-none px-4 py-2 md:py-4 border w-full"
                  />
                </div>
                {/* {billing.status !== "loading" && ( */}
                <button
                  onClick={submitBiling}
                  className="py-3 px-3  md:py-4 md:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px]"
                >
                  {billing.status === "loading" ? (
                    <ClipLoader color="#ffffff" size={12} />
                  ) : (
                    "Save address"
                  )}
                </button>
                {/* )} */}

                <div className="flex mt-4">
                  <input
                    type="checkbox"
                    class=" checked:bg-blue-500 "
                    onChange={openPass}
                  />
                  <p className="ml-3">Create an account?</p>
                </div>
                {openPassword === true && (
                  <div>
                    <p className="text-base my-2 font-semibold">
                      Create account password *
                    </p>
                    <input
                      placeholder="Password"
                      className="outline-none w-1/2 px-4 py-2 md:py-4 border"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="text-xl md:mt-0 mt-4 font-semibold ">
                  Additional information
                </p>
                <div className="mt-10">
                  <p className="text-base font-semibold mb-2">
                    Order notes (optional)
                  </p>
                  <textarea
                    className="outline-none px-4 py-2 md:py-4 border w-full"
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-8xl">Loading</p>
        )}

        <div className="mt-10">
          <p className="md:text-3xl text-xl lg:text-4xl text-gray-800 font-bold ">
            Your order
          </p>
          <div className="grid grid-cols-2 font-extrabold text-lg md:text-xl mt-8 ">
            <div>
              <p>Product</p>
            </div>
            <div>
              <p>Subtotal</p>
            </div>
          </div>
          <div className="bg-gray-300 w-full h-[1px] mt-4"></div>

          <div className=" text-base md:text-xl mt-4 ">
            {cartItem &&
              Object.keys(cartItem).map((key, index) => (
                <>
                  <div className="grid grid-cols-2">
                    <div className="block">
                      {/* <p
                  // key={index}
                  // cartItem={cartItem[key]}
                  // onQuantInc={quantityInc}
                  // onQuantDec={quantityDec}
                  > */}
                      <p className="text-gray-400">
                        {cartItem[key].name}{" "}
                        <span className="font-bold">x{cartItem[key].qty}</span>
                      </p>

                      {/* </p> */}
                    </div>

                    <div>
                      <p className="text-gray-400">
                        {cartItem[key].price * cartItem[key].qty}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-300 w-full h-[1px] my-4"></div>
                </>
              ))}

            {/* <div>
              <p className="text-base text-gray-400">Black light × 1</p>
            </div> */}
            {/* <div>
              <p className="text-base text-gray-400"> £73.00</p>
            </div> */}
          </div>

          <div className="grid grid-cols-2 font-extrabold text-base md:text-xl mt-4 ">
            <div>
              <p>Subtotal</p>
            </div>
            <div>
              <p className=" text-gray-400">
                {" "}
                {cartItem &&
                  Object.keys(getcart?.result?.cartItems).reduce(
                    (totalPrice, key) => {
                      const { price, qty } = getcart?.result?.cartItems[key];
                      return totalPrice + price * qty;
                    },
                    0
                  )}
              </p>
            </div>
          </div>
          <div className="bg-gray-300 w-full h-[1px] mt-4"></div>

          <div className="grid grid-cols-2 font-extrabold text-base md:text-xl mt-4 ">
            <div>
              <p>Total</p>
            </div>
            <div>
              <p className=" text-gray-400">
                {" "}
                {cartItem &&
                  Object.keys(getcart?.result?.cartItems).reduce(
                    (totalPrice, key) => {
                      const { price, qty } = getcart?.result?.cartItems[key];
                      return totalPrice + price * qty;
                    },
                    0
                  )}
              </p>
            </div>
          </div>
          {/* <div className="bg-gray-300 w-full h-[1px] mt-4"></div>

          <div className="grid grid-cols-2 font-extrabold text-base md:text-xl mt-4 ">
            <div>
              <p>Total</p>
            </div>
            <div>
              <p className="text-base font-black text-gray-600">£73.00</p>
            </div>
          </div> */}
        </div>
        <div className="bg-gray-300 w-full h-[1px] my-4"></div>

        <button
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                closePaymentModal();
              },
              onClose: () => {},
            })
          }
          className="py-3 px-3  md:py-4 md:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
