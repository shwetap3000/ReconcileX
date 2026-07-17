import PageContainer from "../components/common/PageContainer";
import TransactionStats from "../components/transactions/TransactionStats";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import Navbar from "../components/layout/Navbar";
import DateRangeDropdown from "../components/common/DaysDropdown";
import CustomDateButton from "../components/common/CustomDateButton";
import SearchBar from "../components/layout/SearchBar";

function Transactions() {
  return (
    <>
      <Navbar
        title="Transactions"
        subtitle="Transaction records and reconciliation status. "
        actions={
          <>
            <DateRangeDropdown />
            <CustomDateButton />
            <SearchBar />
          </>
        }
      />
      <PageContainer>
        <TransactionStats />

        <TransactionFilters />

        <TransactionTable />
      </PageContainer>
    </>
  );
}

export default Transactions;
