#include <iostream>
#include <vector>
#include <string>
#include <curl/curl.h>

struct Stock {
    std::string symbol;     
    double price;           
    double change;          
    double percent_change; 
};

struct Flag{
    std::string info;
};

class TradingPlatform {
public:
    TradingPlatform() {
        // Initialize any necessary data structures here
    }

    void add_stock(const Stock& stock) {
        stocks.push_back(stock);
    }

    void add_flag(const Flag& flag){
        std::cout << &flag;
        flags.push_back(flag);
    }

    Stock get_stock(const std::string& symbol) {
        for (const auto& stock : stocks) {
            if (stock.symbol == symbol) {
                return stock;
            }
        }
        throw std::runtime_error("Stock not found: " + symbol);
    }

    void buy_stock(const std::string& symbol, int quantity) {
        //TODO: implement buy functionality
    }

    void sell_stock(const std::string& symbol, int quantity) {
        //TODO: implement sell functionality
    }

private:
    std::vector<Stock> stocks;
    std::vector<Flag> flags;
};

int main() {
    TradingPlatform platform;

    platform.add_stock({"AAPL", 127.79, 1.23, 0.97});
    platform.add_stock({"GOOG", 2115.74, -10.52, -0.50});
    platform.add_stock({"TSLA", 694.40, 2.47, 0.36});
    platform.add_flag({"CSUSM"});
    platform.add_flag({"{but_i_"});
    platform.add_flag({"made_the_"});
    platform.add_flag({"vector_private_"});
    platform.add_flag({"???}"});
    platform.buy_stock("AAPL", 100);
    platform.sell_stock("TSLA", 50);

    return 0;
}
