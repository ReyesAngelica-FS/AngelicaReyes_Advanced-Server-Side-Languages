import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class HelloASL {
    public static void main(String[] args) {
        System.out.println("Hello ASL!");
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println(now.format(formatter));
    }
}
