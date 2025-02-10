import { Flex, FlexItem } from "@pluralsight/react";
import React from "react";

import imageBudget from "../../assets/budget.jpeg";

export const HomePage: React.FC = () => {
  const itemStyles = {
    height: "50rem",
    paddingLeft: "30px",
  };

  return (
    <>
      <main>
        <Flex align="center" justify="space-evenly">
          <FlexItem grow="1" style={itemStyles}>
            <img style={{ width: "100%" }} src={imageBudget} alt="budget" />
          </FlexItem>
          <FlexItem grow="1" style={itemStyles}>
            <div>
              <h1>Welcome to Fintrack </h1>
              <br />
              <p>
                Manage your money easily and effectively.
                <b>With Fintrack, you can:</b>
              </p>
              <div>
                <b>&#9679; Setting your budget:</b> Define your monthly income
                and expenses to have clear control of your financial situation.
              </div>
              <div>
                <b>&#9679; Track your expenses:</b> Write down your daily
                purchases and expenses to identify areas in which you can save.
              </div>
              <div>
                <b>&#9679; Visualize your finances:</b> Access graphs and
                reports that will show you how your money is distributed.
              </div>

              <div>
                <b>&#9679; Receive alerts:</b> We'll notify you when you get
                close to your spending limit in specific categories.
              </div>
              <div>
                <b>&#9679; Savings goals:</b> Set goals and track your progress
                toward achieving your financial goals.
              </div>
              <br />
              <div>
                <b>Get started today and take control of your finances!</b>{" "}
              </div>
            </div>
          </FlexItem>
        </Flex>
      </main>
    </>
  );
};
