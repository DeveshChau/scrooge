<?php

error_reporting(E_ERROR | E_WARNING | E_PARSE);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "innovation";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

$Doctor_ID = 1; #$_GET["Doctor_ID"];
$Hospital_ID = 1;#1$_GETT["Hospital_ID"];
#$Date = $_GET["Date"];

$Date = date("Y-m-d");
$Day = date('l', strtotime($date)); // note: first arg to date() is lower-case L

?>
<table class="table">
        <thead>
            <tr>
                <th>Select Slot</th>
                <th>Time Slots</th>
                <th>Slot Availability </th>
            </tr>
        </thead>
        <tbody>

		<?php
			$sql = "SELECT * FROM dr_timetable where Dr_ID=$Doctor_ID AND Hosp_ID=$Hospital_ID AND Day='$Day'";
			$result = mysqli_query($conn, $sql);

			while($row = mysqli_fetch_assoc($result)) {

				$Start_Time = strtotime("$Date $row[Start_Time]");
				$End_Time = strtotime("$Date $row[End_Time]");
				$Slot_Time = $row[Slot_Time];
				switch ($Slot_Time) {
					case 5:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +5 minutes');
					break;
					case 10:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +10 minutes');
					break;
					case 15:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +15 minutes');
					break;
					case 20:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +20 minutes');
					break;
				}


				for ($i=0; $Slot <= $End_Time; $i++) {
		?>
				<tr>
				<?php
					$full_date_time = $Doctor_ID." on ".date('Y-m-d H:i', $Start_Time)." to ".date('Y-m-d H:i', $Slot);
					$sql_check_app = "SELECT * FROM appointment where full_date_time='$full_date_time'";
					$result_sql_check_app = $conn->query($sql_check_app);
					if ($result_sql_check_app->num_rows > 0) {
				?>
					<td><input type="radio" disabled></td>
					<td><?php echo  date('H:i', $Start_Time); ?> - <?php echo  date('H:i', $Slot); ?></td>
					<td>Not Available</td>
				<?php
					}
				else{
					?>
					<td><input required type="radio" name="slot_radio" value="<?php echo $Doctor_ID." on ".date('Y-m-d H:i', $Start_Time)." to ".date('Y-m-d H:i', $Slot); ?>"></td>
					<td><?php echo  date('H:i', $Start_Time); ?> - <?php echo  date('H:i', $Slot); ?></td>
					<td>Available</td>

				<?php
				}
				?>
				</tr>
		<?php
			$Start_Time = $Slot;
					switch ($Slot_Time) {
					case 5:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +5 minutes');
					break;
					case 10:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +10 minutes');
					break;
					case 15:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +15 minutes');
					break;
					case 20:
					$Slot = strtotime(date('Y-m-d H:i:s',$Start_Time). ' +20 minutes');
					break;
					}
				}
			}
		?>

        </tbody>
</table>
<?php
mysqli_close($conn);

?>
