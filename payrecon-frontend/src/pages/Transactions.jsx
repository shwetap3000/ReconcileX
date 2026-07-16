import PageContainer from "../components/common/PageContainer";
import PageHeader from "../components/common/PageHeader";
import TransactionStats from "../components/transactions/TransactionStats";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";

function Transactions() {
  return (
    <PageContainer>
      <PageHeader
        title="Transactions"
        subtitle="View and explore all transactions across all batches."
      />

      <TransactionStats />

      <TransactionFilters />

      <TransactionTable />
    </PageContainer>
  );
}

export default Transactions;
