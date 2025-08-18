import { useState } from "react";
import "./container.css";
import Button from "./Button";

const Container = ({
  destinationAddress,
  setDestinationAddress,
  amount,
  setAmount,
  selectedCoin,
  setSelectedCoin,
  selectedCoinWallet,
  setSelectedCoinWallet,
  selectedCoinWalletInfo,
  setSelectedCoinWalletInfo,
  message,
  setMessage,
  messageReceiver,
  setMessageReceiver,
  name,
  setName,
  userName,
  setUserName,
  service,
  setService,
  base64,
  setBase64,
  identifier,
  setIdentifier,
  groupId,
  setGroupId,
  getProfileProperty,
  setGetProfileProperty,
  setProfilePropertyName,
  setSetProfilePropertyName,
  setProfilePropertyObjectKey,
  setSetProfilePropertyObjectKey,
  setProfilePropertyObjectValue,
  setSetProfilePropertyObjectValue,
  buttonData
}) => {
  const [coinType] = useState(["QORT", "LTC", "DOGE", "RVN", "ARRR"]);
  const [coinTypeWalletInfo] = useState(["BTC", "LTC", "DOGE", "RVN"]);

  return (
    <div className="wrapper">
      <div className="main-row">
        <div className="card">
          <div className="row">Send Coin (QORT)</div>
          <input
            type="text"
            className="custom-input"
            placeholder="Destination Address"
            value={destinationAddress}
            onChange={(e) => {
              setDestinationAddress(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="QORT"
            className="custom-number-input"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          {buttonData
            .filter(button => button.name === "Send coin to address")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
        <div className="card">
          <div className="row">Check for balance</div>
          <div className="coin-type-row">
            {coinType.map((coin, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedCoin(coin);
                  }}
                  style={{ backgroundColor: selectedCoin === coin && "#13ecff" }}
                  className="coin"
                  key={index}
                >
                  {coin}
                </div>
              );
            })}
          </div>
          {buttonData
            .filter(button => button.name === "Get wallet balance")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
        <div className="card">
          <div className="row">Send Message</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="Message Receiver Address"
              value={messageReceiver}
              onChange={(e) => {
                setMessageReceiver(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Message"
              className="custom-input"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          {buttonData
            .filter(button => button.name === "Send a private chat message")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
        <div className="card">
          <div className="row">Create a poll</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Create a poll")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Vote on a poll</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Vote on a poll")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Deploy an AT</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Deploy an AT")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Get user wallet info</div>
          <div className="coin-type-row">
            {coinTypeWalletInfo.map((coin, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedCoinWalletInfo(coin);
                  }}
                  style={{ backgroundColor: selectedCoinWalletInfo === coin && "#2600ffdf" }}
                  className="coin"
                  key={index}
                >
                  {coin}
                </div>
              );
            })}
          </div>
          {buttonData
            .filter(button => button.name === "Get user wallet info")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
      </div>
      <div className="main-row">
        <div className="card">
          <div className="row">Publish</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Service"
              className="custom-input"
              value={service}
              onChange={(e) => {
                setService(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Service"
              className="custom-input"
              value={base64}
              onChange={(e) => {
                setBase64(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Identifier"
              className="custom-input"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
              }}
            />
            {buttonData
              .filter(button => button.name === "Publish QDN resource")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Join Group</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="GroupId"
              value={groupId}
              onChange={(e) => {
                setGroupId(e.target.value);
              }}
            />
            {buttonData
              .filter(button => button.name === "Join Group")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Send local notification</div>
          {buttonData
            .filter(button => button.name === "Send local notification")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
        <div className="card">
          <div className="row">Get user wallet</div>
          <div className="coin-type-row">
            {coinType.map((coin, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedCoinWallet(coin);
                  }}
                  style={{ backgroundColor: selectedCoinWallet === coin && "#ffa600" }}
                  className="coin"
                  key={index}
                >
                  {coin}
                </div>
              );
            })}
          </div>
          {buttonData
            .filter(button => button.name === "Get user wallet")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
        <div className="card">
          <div className="row">Get day summary</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Get day summary")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Get friends list</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Get friends list")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Encrypt data</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Encrypt data")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="main-row">
        <div className="card">
          <div className="row">Open user profile</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="User name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          {buttonData
            .filter(button => button.name === "Open user profile")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
        <div className="card">
          <div className="row">Get Profile Data Property</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="Profile Property"
              value={getProfileProperty}
              onChange={(e) => {
                setGetProfileProperty(e.target.value);
              }}
            />
            {buttonData
              .filter(button => button.name === "Get profile property")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Set Profile Data Property Name</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="Profile Property Name"
              value={setProfilePropertyName}
              onChange={(e) => {
                setSetProfilePropertyName(e.target.value);
              }}
            />
          </div>
          <div className="row">Set Profile Data Object Key</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="Profile Property Object Key"
              value={setProfilePropertyObjectKey}
              onChange={(e) => {
                setSetProfilePropertyObjectKey(e.target.value);
              }}
            />
          </div>
          <div className="row">Set Profile Data Object Value</div>
          <div className="message-row">
            <input
              type="text"
              className="custom-input"
              placeholder="Profile Property Object Value"
              value={setProfilePropertyObjectValue}
              onChange={(e) => {
                setSetProfilePropertyObjectValue(e.target.value);
              }}
            />
          </div>
          {buttonData
            .filter(button => button.name === "Set profile property")
            .map((button, index) => {
              return (
                <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
              )
            })
          }
        </div>
        <div className="card">
          <div className="row">Get Logged In User Address</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Get address of logged in account")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Open a new tab</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Open a new tab")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>
        <div className="card">
          <div className="row">Get Permission for Notifications from User</div>
          <div className="message-row">
            {buttonData
              .filter(button => button.name === "Get Permission for Notifications from User")
              .map((button, index) => {
                return (
                  <Button key={index} bgColor={button.bgColor} onClick={button.onClick} name={button.name} />
                )
              })
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default Container;
