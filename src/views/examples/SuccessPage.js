import useAuth from "hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, Col } from "reactstrap";

const SuccessPage = () => {
  const { user, logOut } = useAuth();
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              {user?.email ? (
                <>
                  <small>User Information</small>
                  <h4 className="mt-3">{user?.displayName}</h4>
                  <h5>{user?.email}</h5>
                </>
              ) : (
                <>
                  <h3>You are not Logged In</h3>
                  <h4 className="text-warning">
                    Please log in and try again!!
                  </h4>
                </>
              )}
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center mb-4">
              {user?.email ? (
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={logOut}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/logout.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">LogOut</span>
                </Button>
              ) : (
                <Link to="/auth/login">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={logOut}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/icons/common/logout.svg")
                            .default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default SuccessPage;
